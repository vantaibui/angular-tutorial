import {
  Component,
  Injectable,
  InjectionToken,
  NgModule,
  inject,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

/* =========================================================
 * Services
 * ======================================================= */

@Injectable({
  providedIn: 'root',
})
class RootService {
  value = 0;
}

@Injectable()
class SharedService {
  value = 0;
}

/* =========================================================
 * Components - IMPORTANT: standalone: false
 * ======================================================= */

@Component({
  selector: 'app-local-provider',
  template: '',
  standalone: false,
  providers: [SharedService],
})
class LocalProviderComponent {
  readonly service = inject(SharedService);
}

@Component({
  selector: 'app-module-provider',
  template: '',
  standalone: false,
})
class ModuleProviderComponent {
  readonly service = inject(SharedService);
}

@Component({
  selector: 'app-nearest-provider',
  template: '',
  standalone: false,
  providers: [SharedService],
})
class NearestProviderComponent {
  readonly service = inject(SharedService);
}

/* =========================================================
 * NgModule for test components
 * ======================================================= */

@NgModule({
  declarations: [
    LocalProviderComponent,
    ModuleProviderComponent,
    NearestProviderComponent,
  ],
  exports: [
    LocalProviderComponent,
    ModuleProviderComponent,
    NearestProviderComponent,
  ],
})
class DiTestingModule {}

/* =========================================================
 * TC5 - InjectionToken + useValue
 * ======================================================= */

interface AppConfig {
  apiUrl: string;
  appName: string;
}

const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

/* =========================================================
 * TC6 - multi
 * ======================================================= */

const MULTI_TOKEN = new InjectionToken<string[]>('MULTI_TOKEN');

/* =========================================================
 * TC7 - useClass
 * ======================================================= */

abstract class UserService {
  abstract getName(): string;
}

@Injectable()
class RealUserService implements UserService {
  getName(): string {
    return 'real';
  }
}

@Injectable()
class FakeUserService implements UserService {
  getName(): string {
    return 'fake';
  }
}

/* =========================================================
 * Tests
 * ======================================================= */

describe('Angular Dependency Injection', () => {
  beforeEach(() => {
    TestBed.resetTestingModule();
  });

  /* TC1 */
  it('TC1 - providedIn root returns same instance', () => {
    const service1 = TestBed.inject(RootService);
    const service2 = TestBed.inject(RootService);

    expect(service1).toBe(service2);
  });

  /* TC2 */
  it('TC2 - component providers create separate service instances', async () => {
    await TestBed.configureTestingModule({
      imports: [DiTestingModule],
    }).compileComponents();

    const fixture1 =
      TestBed.createComponent(LocalProviderComponent);

    const fixture2 =
      TestBed.createComponent(LocalProviderComponent);

    const component1 = fixture1.componentInstance;
    const component2 = fixture2.componentInstance;

    component1.service.value = 100;

    expect(component1.service.value).toBe(100);
    expect(component2.service.value).toBe(0);

    expect(component1.service).not.toBe(
      component2.service,
    );
  });

  /* TC3 */
  it('TC3 - components share module/TestBed service instance', async () => {
    await TestBed.configureTestingModule({
      imports: [DiTestingModule],
      providers: [SharedService],
    }).compileComponents();

    const fixture1 =
      TestBed.createComponent(ModuleProviderComponent);

    const fixture2 =
      TestBed.createComponent(ModuleProviderComponent);

    const component1 = fixture1.componentInstance;
    const component2 = fixture2.componentInstance;

    component1.service.value = 200;

    expect(component2.service.value).toBe(200);

    expect(component1.service).toBe(
      component2.service,
    );
  });

  /* TC4 */
  it('TC4 - nearest provider wins', async () => {
    await TestBed.configureTestingModule({
      imports: [DiTestingModule],
      providers: [SharedService],
    }).compileComponents();

    const moduleService =
      TestBed.inject(SharedService);

    const fixture =
      TestBed.createComponent(
        NearestProviderComponent,
      );

    const componentService =
      fixture.componentInstance.service;

    expect(componentService).not.toBe(
      moduleService,
    );
  });

  /* TC5 */
  it('TC5 - InjectionToken + useValue', () => {
    const config: AppConfig = {
      apiUrl: 'https://api.example.com',
      appName: 'Angular Tutorial',
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_CONFIG,
          useValue: config,
        },
      ],
    });

    const result =
      TestBed.inject(APP_CONFIG);

    expect(result).toBe(config);

    expect(result.apiUrl).toBe(
      'https://api.example.com',
    );

    expect(result.appName).toBe(
      'Angular Tutorial',
    );
  });

  /* TC6 */
  it('TC6 - multi provider returns array in declaration order', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MULTI_TOKEN,
          useValue: 'first',
          multi: true,
        },
        {
          provide: MULTI_TOKEN,
          useValue: 'second',
          multi: true,
        },
      ],
    });

    const result =
      TestBed.inject(MULTI_TOKEN);

    expect(result).toEqual([
      'first',
      'second',
    ]);
  });

  /* TC7 */
  it('TC7 - useClass injects fake implementation', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useClass: FakeUserService,
        },
      ],
    });

    const service =
      TestBed.inject(UserService);

    expect(service).toBeInstanceOf(
      FakeUserService,
    );

    expect(service).not.toBeInstanceOf(
      RealUserService,
    );

    expect(service.getName()).toBe('fake');
  });
});
