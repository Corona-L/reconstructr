module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    projectname: DataTypes.STRING,
  });
  Project.associate = model => {
    Project.hasMany(model.step);
    Project.belongsTo(model.user);
  };
  return Project;
};
