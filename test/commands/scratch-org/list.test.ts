import { expect, test } from '@oclif/test';

describe('scratch-org list', () => {
  test
    .stdout()
    .command(['scratch-org list'])
    .it('runs hello', (ctx) => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['scratch-org list', '--name', 'Astro'])
    .it('runs hello --name Astro', (ctx) => {
      expect(ctx.stdout).to.contain('hello Astro');
    });
});
