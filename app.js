// Web service that accepts a payload, processes it and send the response
const express = require('express');
const app = express();

app.use(express.json());

// Send error message if invalid Json file
app.use(function(err, req, res, next) {
        res.status(400).send({error: 'Could not decode request: JSON parsing failed'});
  });
  
// Process the valid Json posted
app.post('/',(req,res) => {
    try{
        // Get the payload from incoming Jason
        var payload = req.body.payload;
        
        // Placeholder for response
        var responsePayload = {};
        responsePayload.response = [];

        var count = 0; // Counter for result array

        for(var i = 0; i < payload.length; i++) {

            // Get only drm enabled and having episode count more than 0
            if (payload[i].episodeCount > 0 && payload[i].drm === true)        
            {
                responsePayload.response[count] = {
                                                        "image" : payload[i].image.showImage,
                                                        "slug" : payload[i].slug,
                                                        "title" : payload[i].title
                                                };            
                count++;
            }
        }

        // Send the response Json
        res.send(responsePayload);

    } catch (e) {
                    // Error if Jason does not contain "payload"
                    res.status(400).send({error: 'Could not decode request: JSON parsing failed'});
                }
});

// Information to the user to use POST method
app.get('/',(req,res) => {
    res.send('GET: Not a valid request for this URL. Please use POST');    
});

// Set the port to environment port, if not set use 8081
var port = process.env.PORT || 8081;

// Start the listener
app.listen(port, () => console.log(`listening on port ${port}..`));