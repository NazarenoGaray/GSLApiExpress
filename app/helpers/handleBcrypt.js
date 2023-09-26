const bcrypt = require('bcrypt');

const encrypt = async (textPlain) =>{
    const hash = await bcrypt.hash(textPlain,10)
    return hash;
}
const compare = async (contraseñaPlain, hashContraseña) =>{
    return await bcrypt.compare(contraseñaPlain,hashContraseña);
}

module.exports = { encrypt, compare};