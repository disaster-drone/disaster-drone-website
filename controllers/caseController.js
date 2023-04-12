const Case = require ('../models/Case')

const getAllCases = async (req, res) => {
    // this returns all the cases in the database
    const cases = await Case.find(); 
    if(!cases) return res.status(204).json({'message':'No cases found'});
    res.json(cases);
}

module.exports = {
    getAllCases
}