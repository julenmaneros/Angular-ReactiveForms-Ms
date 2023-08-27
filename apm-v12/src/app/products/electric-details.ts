export interface IElectricDetails {
    Id: number;
    AzureTenantID: string;
    Name: string;
    HostUrl: string;
    AppId: string;
    AppKey: string;
    AadTenant: string;
    ExpirationDate: string;
    HybridConnectionString: string;
    MeterReadingUserId: string;
    MeterReadingPass: string;
    ConnectUserId: string;
    ConnectPassword: string;
    CisHostUrl: string;
    OmsUrl: string;
    OmsUserId: string;
    OmsPassword: string;
    MultispeakPassword: string;   
    HasElectricCommodity: boolean;
}