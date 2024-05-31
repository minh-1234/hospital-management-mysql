import { Sequelize, Model, DataTypes, UUID } from 'sequelize';
import { sequelize } from '../config/connection.js'
import { treatProcessModel } from './treatment_process.js'
const patient = sequelize.define('patient', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true
  },
  lastMiddleName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  email: DataTypes.STRING,
  phoneNum: DataTypes.STRING,
  dateOfBirth: DataTypes.STRING,
  gender: DataTypes.STRING,
  job: DataTypes.STRING,
  citizenID: DataTypes.STRING,
  height: DataTypes.STRING,
  weight: DataTypes.STRING,
  bloodType: DataTypes.STRING,
  address: DataTypes.STRING,
  hometown: DataTypes.STRING,
  diagnosis: DataTypes.STRING,
  symptoms: DataTypes.STRING,
  medHistory: DataTypes.STRING
}, {
  tableName: 'patients',
  timestamps: false, // Bỏ qua các cột `createdAt` và `updatedAt` nếu không cần thiết
  hooks: {
    beforeCreate: async (patient) => {
      const [results] = await sequelize.query('SELECT UUID_SHORT() as uuid');
      patient.id = results[0].uuid;
    },
  }
});


//associate với bảng treatment_processes
patient.hasMany(treatProcessModel.treatment_process, { foreignKey: 'patientId' })
// Đảm bảo rằng bảng "patients" đã được tạo trong cơ sở dữ liệu
sequelize.sync({ force: false }, { raw: true });
//Patient.hasMany(treatProcessModel.treatment_process)
const getAllPatients = async () => {
  try {
    // Lấy tất cả các bệnh nhân từ cơ sở dữ liệu
    const allPatients = await patient.findAll();
    // Trả về danh sách các bệnh nhân
    return allPatients;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching patients:', error);
    throw error; // Ném lỗi để xử lý ở phía người gọi hàm
  }
};
const findOneById = async (id) => {
  try {

    // Lấy tất cả các bệnh nhân từ cơ sở dữ liệu
    const allPatients = await patient.findByPk(id, { include: [treatProcessModel.treatment_process] });

    // Trả về danh sách các bệnh nhân
    return allPatients;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching patients:', error);
    throw error; // Ném lỗi để xử lý ở phía người gọi hàm
  }
}
const createNew = async (reqBody) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newPatient = await patient.create({ age: "20", name: "Minh", cash: "2000000" });
    console.log("Document written: ", newPatient);
    return newPatient
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const patientModel = {
  getAllPatients,
  findOneById,
  createNew,
  patient
}