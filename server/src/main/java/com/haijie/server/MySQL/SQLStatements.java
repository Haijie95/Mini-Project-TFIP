package com.haijie.server.MySQL;

public class SQLStatements {
    public static final String selectAllSQL="select * from collections";
    public static final String findCollectionByEmail="select * from collections where email=?";
    public static final String updateStatus="update collections set available= no where email=?";
    public static final String insertCollection="insert into collections(displayname,email,cardname,type,cardcondition,defect,price,available,image) values (?,?,?,?,?,?,?,?,?)";
    public static final String removeListing="delete from collections where id = ?";
}
