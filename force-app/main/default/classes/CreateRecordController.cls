public without sharing class CreateRecordController {
    @AuraEnabled(cacheable=true)
    public static void saveAccount(Account acc){
        try 
        {
            System.debug('inserting account');
            insert acc;
            
        } catch (Exception e) {
            System.debug('err:'+e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }
}