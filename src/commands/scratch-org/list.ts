import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.load('sf-scratch-org-plugin', 'scratch-org.list', [
  'summary',
  'description',
  'examples',
  'flags.name.summary',
  'flags.target-dev-hub.summary',
]);

export type ScratchOrgListResult = {
  path: string;
};

export default class ScratchOrgList extends SfCommand<ScratchOrgListResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    name: Flags.string({
      summary: messages.getMessage('flags.name.summary'),
      char: 'n',
      required: false,
    }),
    'target-dev-hub': Flags.requiredHub({
      summary: messages.getMessage('flags.target-dev-hub.summary'),
      required: true,
    }),
  };

  public async run(): Promise<ScratchOrgListResult> {
    const { flags } = await this.parse(ScratchOrgList);

    const name = flags.name ?? 'world';
    this.log(
      `hello ${name} from /Users/okonomi/src/github.com/okonomi/sf-scratch-org-plugin/src/commands/scratch-org/list.ts`
    );
    return {
      path: '/Users/okonomi/src/github.com/okonomi/sf-scratch-org-plugin/src/commands/scratch-org/list.ts',
    };
  }
}
