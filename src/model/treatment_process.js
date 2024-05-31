import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js'
import { specialistModel } from './specialist.js';
//import { patientModel } from './patient.js'
const treatment_process = sequelize.define('treatment_process', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true
  },
  dateBegin: DataTypes.STRING,
  title: DataTypes.STRING,
  dateEnd: DataTypes.STRING,
  timeBegin: DataTypes.STRING,
  timeEnd: DataTypes.STRING,
  room: DataTypes.STRING,
  description: DataTypes.TEXT,
  patientId: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: 'patients', // 'fathers' refers to table name
      key: 'id', // 'id' refers to column name in fathers table
    }
  },
  medicalStaffID: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: 'specialists', // 'fathers' refers to table name
      key: 'id', // 'id' refers to column name in fathers table
    }
  }
  // patientId: DataTypes.INTEGER
}, {
  tableName: 'treatment_processes',
  timestamps: false, // Bỏ qua các cột `createdAt` và `updatedAt` nếu không cần thiết
  hooks: {
    beforeCreate: async (treatment_process) => {
      const [results] = await sequelize.query('SELECT UUID_SHORT() as uuid');
      treatment_process.id = results[0].uuid;
    },
  }
});
treatment_process.hasOne(specialistModel.specialist, { foreignKey: 'medicalStaffID' })
// Đảm bảo rằng bảng "patients" đã được tạo trong cơ sở dữ liệu
//sequelize.sync({ force: true, raw: true });
const getAllTreatProcess = async (idPatient) => {
  try {

    // Lấy tất cả các bệnh nhân từ cơ sở dữ liệu
    const allProcess = await treatment_process.findAll({ where: { patientId: idPatient } },
      {
        include: [
          {
            model: specialistModel.specialist,
            attributes: ['lastMiddleName', 'firstName', 'position']
          }
        ]
      });

    // Trả về danh sách các bệnh nhân
    return allProcess;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching patients:', error);
    throw error; // Ném lỗi để xử lý ở phía người gọi hàm
  }
};
export const treatProcessModel = {
  treatment_process,
  getAllTreatProcess
}

// db.Course.findAll({
//   include: [
//     // {model:db.Room, attributes:['id','DisplayLabel']},
//     // {model:db.Period, attributes:['id','DisplayName']},
//     { model: db.Subject, attributes: ["id", "Name"] },
//     // {model:db.Schedule, attributes:['id','Day','StartHour','EndHour']},
//     { model: db.Person, where: { id: db.Course.PersonId } }
//   ]
// });