
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('step', {
    stepnum: DataTypes.INTEGER,
    imageurl: DataTypes.STRING,
    audiourl: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  Step.associate = model => {
    Step.belongsTo(model.project);
  };
  return Step;
};