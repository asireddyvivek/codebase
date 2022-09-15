public with sharing class mini_project_lwc{
    @AuraEnabled //insert record
    public static String insert_Details(String Shop_Name, Decimal code, String Owner_Name, Decimal Annual_Turnover , String Street_Name, string City, Decimal Pincode){
        try{
            System.debug('Name :'+ Shop_Name);
            Shop__c s = new Shop__c();
            s.Name = Shop_Name;
            s.Shop_Code__c = code;
            s.Owner_Name__c = Owner_Name;
            //s.Shop_Type__c = Type;
            s.Annual_Turnover__c = Annual_Turnover;
            insert s;
            System.debug('StreetName :'+ Street_Name + ' CityName :' + City);
            Address__c ad = new Address__c();
            ad.Street__c = Street_Name;
            ad.City__c = City;
            ad.Pincode__c = Pincode;
            //ad.State__c = State;
            insert ad;
            return 'Details Inserted';
        }

        catch (Exception e){
            System.debug(e.getMessage());
            throw new AuraHandledException(e.getMessage());       
        }      
    }
    
    @AuraEnabled //get All records
    public static List<Shop__c> get_RecordDetails(){
        try{
            List<Shop__c> shops_list = [Select Id,Name,Shop_Code__c,Owner_Name__c,Annual_Turnover__c from Shop__c ];
            return shops_list;
        }
        catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled //Delete record
    public static String delete_DetailsRecord(String id){
        
        try{
            System.debug('id'+id);
            Shop__c s = [Select Id from Shop__c where Id =: id];
            //s.Id = id;
            
            delete s;
            return 'Details Deleted';
        }
        catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(Cacheable = true)
    public static list<Shop__c> searchNameMethod(String textkey) {
        textkey = '%' + textkey + '%';
        list<Shop__c> shopLst = [Select Id, Name,Shop_Code__c,Owner_Name__c, Annual_Turnover__c From Shop__c Where Name Like :textkey];
        
        if(shopLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return shopLst; 
    }

}