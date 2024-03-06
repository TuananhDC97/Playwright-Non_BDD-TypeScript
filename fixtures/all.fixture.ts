import { Page, test as baseTest } from '@playwright/test';
import { PageFixtureType, pageFixture } from './page.fixture';
import { BaseFixtureType, baseFixture } from './base.fixture';
import { ApiFixtureType, apiFixture } from './api.fixture';

// follow https://github.com/microsoft/playwright/discussions/14688
const test = baseTest.extend<BaseFixtureType & PageFixtureType & ApiFixtureType>({ // See TypeScript intersection type https://github.com/microsoft/TypeScript/blob/v4.5.4/doc/spec-ARCHIVED.md#35-intersection-types
    ...baseFixture,
    ...pageFixture, // ES6 spread operator (three dots ...) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    ...apiFixture
});

export default test;
export const expect = test.expect;