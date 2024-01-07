import { CapitalizedPipe } from './capitalized.pipe';

describe('CapitalizedPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizedPipe();
    expect(pipe).toBeTruthy();
  });
});
