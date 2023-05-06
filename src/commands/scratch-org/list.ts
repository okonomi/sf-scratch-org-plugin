import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { type QueryResult } from 'jsforce';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sf-scratch-org-plugin', 'scratch-org.list');

type ScrachOrgInfo = {
  Id: string;
  ScratchOrg: string;
  ExpirationDate: Date;
  SignupUsername: string;
  Edition: string;
  OrgName: string;
  Status: string;
};

export type ScratchOrgListResult = QueryResult<ScrachOrgInfo>;

export default class ScratchOrgList extends SfCommand<ScratchOrgListResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    'target-dev-hub': Flags.requiredHub(),
  };

  public async run(): Promise<ScratchOrgListResult> {
    const { flags } = await this.parse(ScratchOrgList);

    const orgDevHub = flags['target-dev-hub'];
    const connection = orgDevHub.getConnection('57.0');
    const result = await connection.query<ScrachOrgInfo>(
      'SELECT Id, ScratchOrg, ExpirationDate, SignupUsername, Edition, OrgName, Status FROM ScratchOrgInfo'
    );

    if (result.records.length > 0) {
      this.printScratchOrgTable(result.records);
    } else {
      this.log('No Scratch Orgs found.');
    }

    return result;
  }

  private printScratchOrgTable(scratchOrgs: ScrachOrgInfo[]): void {
    this.table(scratchOrgs, {
      Id: {
        header: 'Id',
      },
      ScratchOrg: {
        header: 'ScratchOrg',
      },
      ExpirationDate: {
        header: 'ExpirationDate',
      },
      SignupUsername: {
        header: 'SignupUsername',
      },
      Edition: {
        header: 'Edition',
      },
      OrgName: {
        header: 'OrgName',
      },
      Status: {
        header: 'Status',
      },
    });
  }
}
