package com.haijie.server.models;

import java.io.IOException;
import java.io.StringReader;
import java.util.Collections;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue.ValueType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cards {
    private String name;
    private String id;
    private String setName;
    private String series;
    private String image;
    private String tcgUrl;
    private Double marketPrice;

    public static List<Cards> create(String response) throws IOException{
		String payload = response;

		JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject pkmResp = reader.readObject();
        JsonArray jsonArr = pkmResp.getJsonArray("data");
		if(jsonArr.getValueType()==ValueType.NULL){
			return Collections.emptyList();
		} else{
			return jsonArr.stream()
                .map(v -> v.asJsonObject())
                .map(Cards::createCards)
                .toList();
		}
	}

    public static Cards createCards(JsonObject o){
        //initialise a new character
        Cards c = new Cards();
        
        //getting needed info
        //card info
		c.name= o.getString("name");
        c.id=o.getString("id");

        //set info
		c.setName=o.getJsonObject("set").getString("name");
        //series will be use for back button
		c.series= o.getJsonObject("set").getString("series");
        //c.series= o.getJsonObject("set").getString("ptcgoCode");

        //image info
		c.image=o.getJsonObject("images").getString("large");


        //price info
        c.tcgUrl=o.getJsonObject("tcgplayer").getString("url");
        
        //JsonObject p = o.getJsonObject("cardmarket").getJsonObject("prices");
        JsonObject p = o.getJsonObject("cardmarket");
        JsonObject hfp = p.getJsonObject("prices");
        if(hfp != null && hfp.containsKey("averageSellPrice")){
            c.marketPrice=hfp.getJsonNumber("averageSellPrice").doubleValue();
        } else {
            c.marketPrice=0.0;
        }
		//return this review
		System.out.println("what is here? "+c);
        return c;
    }
}
