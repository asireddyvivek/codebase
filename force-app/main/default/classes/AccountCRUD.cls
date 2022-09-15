public with sharing class AccountCRUD {
    public AccountCRUD() {
    }
    @AuraEnabled
    public static string insertAccount(Account acc){
        try {
            System.debug(acc);
            insert acc;
            System.debug(acc);
            return acc.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Account> getAccounts(){
        try {
            return [Select id,name,Age__c from Account where Age__c != null];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Id updateAccount(Account acc){
        try{
            update acc;
            return acc.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Boolean deleteAccount(Account acc){
        try {
            delete acc;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}