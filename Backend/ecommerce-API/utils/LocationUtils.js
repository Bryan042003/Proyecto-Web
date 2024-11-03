const { Province, Canton, District } = require('../models');


async function getLocationIds(province, canton, district) {
    const provinceId = await Province.findOne({ where: { name: province } });
    if(!provinceId){
        throw new Error('Province not found');
    }

    const cantonId = await Canton.findOne({ where: { name: canton, id_province: provinceId.id } });
    if(!cantonId){
        throw new Error('Canton not found');
    }

    const districtId = await District.findOne({ where: { name: district, id_canton: cantonId.id } });
    if(!districtId){
        throw new Error('District not found');
    }

    return{
        id_province: provinceId.id,
        id_canton: cantonId.id,
        id_district: districtId.id
    }
}

module.exports = {getLocationIds}