package com.haijie.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCard {
    private Integer id;
    private String displayname;
    private String email;
    private String cardname;
    private String type;
    private String cardcondition;
    private String defect;
    private String price;
    private String available;
    private byte[] image;
}
