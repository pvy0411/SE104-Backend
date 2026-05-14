// Định dang ngày tháng cho DB (SQL Server chấp nhận định dạng YYYY-MM-DD)
<<<<<<< HEAD
const getDateForDB = () => {
=======
const GetDateForDB = () => {
>>>>>>> 7e73e0d6567e5ab73422d4a1c3aee3fd96619f0d
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`; 
};

// Định dạng ngày tháng cho hiển thị cho người dùng (DD-MM-YYYY)
<<<<<<< HEAD
const getDateForDisplay = () => {
=======
const GetDateForDisplay = () => {
>>>>>>> 7e73e0d6567e5ab73422d4a1c3aee3fd96619f0d
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    return `${day}-${month}-${year}`; 
};

module.exports = {
<<<<<<< HEAD
    getDateForDB,
    getDateForDisplay
=======
    GetDateForDB,
    GetDateForDisplay
>>>>>>> 7e73e0d6567e5ab73422d4a1c3aee3fd96619f0d
};