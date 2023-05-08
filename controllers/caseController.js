const Case = require ('../models/Case')

// Function to call in the frontend to return a json object of all the cases in the database
const getAllCases = async (req, res) => {
    const cases = await Case.find(); 
    if(!cases) return res.status(204).json({'message':'No cases found'});
    res.json(cases);
}

module.exports = {
    getAllCases
}