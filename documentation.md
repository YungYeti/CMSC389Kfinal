
# Song Playlist

---

Name: Shaswat Shrestha

Date: 12/7/18

Project Topic: Song Playlist

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name       `Type: String`
- `Field 2`:     Year       `Type: Number`
- `Field 3`:     Artist       `Type: String`
- `Field 4`:     Album       `Type: String`
- `Field 5`:     Features       `Type: [String]`

Schema: 
```javascript
{
   name: {
      type: String,
      required: true
    },
    year: {
        type: Number,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    features: [String]
}
```

### 2. Add New Data

HTML form route: `/addSong`

POST endpoint route: `/api/addSong`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addSong',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name: 'FEFE',
       year: 2018,
       artist: '6ix9ine'
       ablum: 'FEFE'
       features: ["Nicki Minaj", "Murda Beatz"]
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getSongs`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. kayne -> `  /kayne  `
2. Newest Songs -> `  /new  `
3. Old Songs -> `  /old  `
4. Singles -> `  /single  `
5. Random songs -> `  /random  `

