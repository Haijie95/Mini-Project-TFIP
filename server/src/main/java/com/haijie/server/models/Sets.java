package com.haijie.server.models;

import java.io.IOException;
import java.io.StringReader;
import java.util.Collections;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonString;
import jakarta.json.JsonValue.ValueType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sets {

    private String name;
    private String series;
    private String code;
    private String releaseDate;
    private String symbol;
    private String logo;

    public static List<Sets> create(String response) throws IOException{
		String payload = response;

		JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject pkmResp = reader.readObject();
        JsonArray jsonArr = pkmResp.getJsonArray("data");
		if(jsonArr.getValueType()==ValueType.NULL){
			return Collections.emptyList();
		} else{
			return jsonArr.stream()
                .map(v -> v.asJsonObject())
                .map(Sets::createSets)
                .toList();
		}
	}

    public static Sets createSets(JsonObject o){
        //initialise a new character
        Sets s = new Sets();
        
        //getting needed info
		s.name= o.getString("name");
		s.series= o.getString("series");

        //check if null, if not null add the code
        JsonString ptcgoCodeJson = o.getJsonString("ptcgoCode");
        s.code = ptcgoCodeJson != null ? ptcgoCodeJson.getString() : null;
        
		s.releaseDate= o.getString("releaseDate");

		s.symbol=o.getJsonObject("images").getString("symbol");
		s.logo=o.getJsonObject("images").getString("logo");

		//return this review
		System.out.println("what is here? "+s);
        return s;
    }
    
    

}
