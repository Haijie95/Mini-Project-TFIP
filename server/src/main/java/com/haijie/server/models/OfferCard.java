package com.haijie.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfferCard {

    private Integer id;
    private String email;
    private String cardname;
    private String offeremail;
    private String name;
    private String offerprice;
}
