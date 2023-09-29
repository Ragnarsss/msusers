import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuardTsGuard', () => {
  it('should be defined', () => {
    expect(new ApiKeyGuard()).toBeDefined();
  });
});
