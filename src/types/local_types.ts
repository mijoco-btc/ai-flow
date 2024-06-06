export type QA = {
    question: string;
    answer?: string;
}

export type ConfigI = {
	mongoDbUrl: string; 
	mongoUser: string; 
	mongoPwd: string; 
	mongoDbName: string; 
	host: string;
	port: number;
	inscriptionsApi1: string;
	inscriptionsApi2: string;
	stacksApi: string;
	jsonl_path_transactions: string;
  };
  
  export type DaoTemplate = {
	addresses: Array<string>;
	tokenName?: string;
	tokenSymbol?: string;
	tokenUrl?: string;
  }
  