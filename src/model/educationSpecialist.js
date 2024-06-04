import { Sequelize, Model, DataTypes, UUID } from 'sequelize';
import { sequelize } from '../config/connection.js'
import { treatProcessModel } from './treatment_process.js'
const education = sequelize.define('education', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  dateBegin: DataTypes.STRING,
  dateEnd: DataTypes.STRING,
  university: DataTypes.STRING,
  major: DataTypes.STRING,
  degree: DataTypes.STRING,
  medicalStaffID: {
    type: DataTypes.STRING,
    references: {
      model: 'specialists', // 'fathers' refers to table name
      key: 'id', // 'id' refers to column name in fathers table
    }
  }
}, {
  tableName: 'educations',
  timestamps: false, // Bỏ qua các cột `createdAt` và `updatedAt` nếu không cần thiết
  hooks: {
    beforeCreate: async (education) => {
      const [results] = await sequelize.query('SELECT UUID_SHORT() as uuid');
      education.id = results[0].uuid.toString();
    },
  }
});



// Đảm bảo rằng bảng "patients" đã được tạo trong cơ sở dữ liệu
sequelize.sync({ force: false }, { raw: true });
//Patient.hasMany(treatProcessModel.treatment_process)
// const getAllPatients = async () => {
//   try {
//     // Lấy tất cả các bệnh nhân từ cơ sở dữ liệu
//     const allPatients = await patient.findAll();
//     // Trả về danh sách các bệnh nhân
//     return allPatients;
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error('Error fetching patients:', error);
//     throw error; // Ném lỗi để xử lý ở phía người gọi hàm
//   }
// };
// const findOneById = async (id) => {
//   try {

//     // Lấy tất cả các bệnh nhân từ cơ sở dữ liệu
//     const allPatients = await patient.findByPk(id, { include: [treatProcessModel.treatment_process] });

//     // Trả về danh sách các bệnh nhân
//     return allPatients;
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error('Error fetching patients:', error);
//     throw error; // Ném lỗi để xử lý ở phía người gọi hàm
//   }
// }
// const createNew = async (reqBody) => {
//   try {
//     // const docRef = await addDoc(collection(db, "users"), req.body);
//     const newPatient = await patient.create({ age: "20", name: "Minh", cash: "2000000" });
//     console.log("Document written: ", newPatient);
//     return newPatient
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
export const educationModel = {
  // getAllPatients,
  // findOneById,
  // createNew,
  education
}