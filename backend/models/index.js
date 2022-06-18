const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class User extends Model {}
class Item extends Model {}
class School extends Model {}
class Favorite extends Model {}
class Major extends Model {}
class Image extends Model {}
// class Tour extends Model {}

User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

Item.init({
    name: DataTypes.STRING
}, {
    sequelize,
    timestamps: false,
});

// Image.init({
//     name: DataTypes.STRING
// }, {
//     sequelize,
//     timestamps: false,
// });

School.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
    },
    fafsa: DataTypes.STRING,
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    ownership: DataTypes.STRING,
    website: DataTypes.STRING,
    school_size: DataTypes.STRING,
    total_students: DataTypes.INTEGER,
    women: DataTypes.FLOAT,
    men: DataTypes.FLOAT,
    school_category: DataTypes.STRING,
    instate_tuition: DataTypes.STRING,
    outofstate_tuition: DataTypes.STRING,
    num_programs_offered:DataTypes.STRING,
    cost_books: DataTypes.STRING,
    cost_roomboard_oncampus: DataTypes.STRING,
    cost_roomboard_offcampus: DataTypes.STRING,
    open_admissions: DataTypes.INTEGER,
    admin_test_reqs: DataTypes.STRING,
    grad_earnings: DataTypes.STRING,



}, {
    sequelize,
    timestamps: false,
});

Favorite.init({
    UserId:  DataTypes.UUID,
    SchoolId: DataTypes.UUID,
    
}, {
    sequelize,
    timestamps: false,
});

Major.init({
    major:  DataTypes.STRING,
    degree: DataTypes.STRING,
    SchoolId: DataTypes.INTEGER,
        
}, {
    sequelize,
    timestamps: false,
});

// Tour.init({
//     school: DataTypes.STRING,
//     tour_url: DataTypes.STRING,
//     SchoolId: DataTypes.INTEGER,
        
// }, {
//     sequelize,
//     timestamps: false,

// });


Major.belongsTo(School);
School.hasMany(Major);
School.belongsToMany(User, {through: Favorite});
User.belongsToMany(School, {through: Favorite});
// Tour.belongsTo(School);
// School.hasOne(Tour);

module.exports = {User, Item, School, Favorite, Major, Image};