const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    
    username: {type: String,
        required: true, 
        unique: true
    },
  
    email: {type: String,
        required: true, 
        unique: true
    },
    
    password: {type: String, 
        required: true, 
        unique: true, 
        match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    },
    
    thoughts: [
        {type: Schema.Types.ObjectId, ref: 'Thought'}
    ],
    
    friends: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]

});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = model('User', userSchema);