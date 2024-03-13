import { ClassType, UnwrapArray } from '@libs/common';
import { instance, mock, reset } from 'ts-mockito';

type Mock<T extends ClassType> = ClassType<UnwrapArray<ConstructorParameters<T>>>;

export class UnitTestBuilder<T extends ClassType> {
  private injector!: T;

  private mocks!: Mock<T>[];

  static setInjector<U extends ClassType>(injector: U) {
    const builder = new UnitTestBuilder<U>();

    builder.injector = injector;

    return builder as Pick<UnitTestBuilder<U>, 'setMocks'>;
  }

  setMocks(...mocks: Mock<T>[]) {
    this.mocks = mocks;
    return this as Pick<UnitTestBuilder<T>, 'build'>;
  }

  build() {
    const mockInstances = this.mocks.map((m) => mock(m)) as ConstructorParameters<T>;
    const injectorInstance = new this.injector(
      ...mockInstances.map((mi) => instance(mi)),
    ) as InstanceType<T>;

    beforeAll(() => {
      mockInstances.forEach((mi) => reset(mi));
    });

    afterEach(() => {
      mockInstances.forEach((mi) => reset(mi));
    });

    return {
      injector: injectorInstance,
      mocks: mockInstances,
    };
  }
}
