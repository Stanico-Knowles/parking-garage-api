module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define("Cars",
        {
            licensePlate: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },     
            color: {
                type: DataTypes.STRING,
                allowNull: false
            },
            clean:{
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            hours: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        {
            timestamps: true,
        }
    )

    return Cars
}