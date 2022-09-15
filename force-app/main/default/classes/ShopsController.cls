public with sharing class ShopsController {
    public ShopsController() {

    }
    @AuraEnabled
    public static List<Shop__c> getShops(){
        try {
            return [SELECT Id, name,Shop_Code__c,Shop_Type__c,Owner_Name__c,Annual_Turnover__c,Address__c,Address__r.Full_Address__c, Address__r.Pincode__c, Address__r.State__c,Address__r.Street__c, Address__r.City__c from Shop__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Shop__c> getFilteredShops(String searchText)
    {
        try {
            String str = '%'+searchText+'%';
            List<Shop__c> shops =  [SELECT Id, name,Shop_Code__c,Shop_Type__c,Owner_Name__c,Annual_Turnover__c,Address__c,Address__r.Full_Address__c from Shop__c where name LIKE: str];                
            return shops;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static string insertShops(Shop__c s, Address__c addr){
        try {
            insert addr;
            s.Address__c = addr.id;
            /*shop.Name = s.shopName;
            shop.Shop_Code__c = s.shopCode;
            shop.Annual_Turnover__c = s.annualTurnover;*/
            
            insert s;
            return s.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static List<String> getStates(String objectName, String fieldName){
        try {
            Schema.SObjectType s = Schema.getGlobalDescribe().get(objectName) ;
            Schema.DescribeSObjectResult r = s.getDescribe() ;
            Map<String,Schema.SObjectField> fields = r.fields.getMap() ;
            Schema.DescribeFieldResult fieldResult = fields.get(fieldName).getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();   
            System.debug(ple);
            List<String> pl = new List<String>();
              for(integer i=0;i<ple.Size();i++){
                    System.debug(ple[i].getValue()+'pl value');
                        pl.add(ple[i].getvalue()) ;
                        
                }
            System.debug('Pl=='+pl);
                 
         
            return pl;      
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    
    

    @AuraEnabled
    public static string deleteShop( String recId){
        try {
            Shop__c s = new Shop__c();
            s.id = recId;
            Delete s;
            return 'Successfully Deleted Record';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
	@AuraEnabled public static String updateShop(Shop__c s, Address__c addr)
    {
        try
        {
            update addr;
            s.Address__c = addr.id;
            update s;
            return s.Id+'';
		}
        catch(Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        }
	}
    
}