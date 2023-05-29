package com.haijie.server.models;

import java.io.StringReader;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String email;
    private String password;
    private String displayname;
    private String region;
    private String uniqueId;

    public JsonObject toJson() {
		return Json.createObjectBuilder()
            .add("uniqueId", uniqueId)
			.add("email", email)
			.add("password", password)
			.add("displayname", displayname)
			.add("region", region)
			.build();
	}

    public static User toCreate(String j) {
		JsonReader reader = Json.createReader(new StringReader(j));
		return toCreate(reader.readObject());
	}

    public static User toCreate(JsonObject j) {
		User user = new User();
		if (j.containsKey("uniqueId") && (!j.isNull("uniqueId")))
			user.setEmail(j.getString("email"));
	    	user.setPassword(j.getString("password"));
		    user.setDisplayname(j.getString("displayname"));
            user.setDisplayname(j.getString("region"));
		    return user;
	}

    public static User createSummary (Document doc){
        User user= new User();
        user.setEmail(doc.getString("email"));
        user.setPassword(doc.getString("password"));
        user.setDisplayname(doc.getString("displayname"));
        user.setRegion(doc.getString("region"));
        user.setUniqueId(doc.getString("uniqueid"));
        return user;
    }
}
