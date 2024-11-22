const getAcademicYear = async(studentId:string) => {
    const respond = await fetch (`http://localhost:3001/academicYear/${studentId}`)
    const data = await respond.json()
    return data;
}

export default getAcademicYear;