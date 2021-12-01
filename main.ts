/* Create a function to add student data to an array as an array of 
objects and render objects to the page

Be sure your function parameters are given strict types

*/


const modal = document.getElementById('modal');
const addGrades = document.getElementById('add-grades')
const viewGrades = document.getElementById('view-grades')
const submitBtn = document.getElementById('submitBtn')
const gradesDiv = document.getElementById('grades-table')
const closeGradesBtn = document.getElementById('close-grades')
const sortGradesBtn = document.getElementById('sort-grades')
const sortCoursesBtn = document.getElementById('sort-course')
const closeModal = document.querySelector('.close')

type Student = {
    firstname:string,
    lastname:string,
    course:string,
    grade:(string|number),
    isPassing:boolean
}

let data:Student[] = []

addGrades?.addEventListener('click', event => {
    event.preventDefault()
    modal.style.display = 'block'
})

viewGrades.addEventListener('click', event => {
    event.preventDefault()
    if (localStorage.getItem('student-grades') != null) {
        data = JSON.parse(localStorage.getItem('student-grades'))
    } 
    viewAllGrades(data)
})

let viewAllGrades = (data:Student[]) => {
    gradesDiv.style.display = 'block'

    let tbody = document.getElementById('grades-table').getElementsByTagName('tbody')[0]
    tbody.innerHTML = ''

    data.forEach(function (element, index) {
        let row = document.createElement('tr')
        let cellName = document.createElement('td')
        let cellCourse = document.createElement('td')
        let cellGrade = document.createElement('td')
        let cellStatus = document.createElement('td')
        let editButton = document.createElement('input')
        let removeButton = document.createElement('input')
        
        cellName.innerHTML = `${element['lastname']}, ${element['firstname']}`
        cellCourse.innerHTML = `${element['course']}`
        cellGrade.innerHTML = `${element['grade']}`
        if (element['isPassing']) {
            cellStatus.innerHTML = 	"\u2705"
        } else {
            cellStatus.innerHTML = 	"\u274c"
        }
   
        editButton.type = 'button'
        editButton.className = 'btn edit-btn'
        editButton.value = 'Edit'
        editButton.addEventListener('click', event => {
            console.log('edit button pressed')
            modal.style.display = 'block'
            let firstname = document.getElementById('firstname')
            let lastname = document.getElementById('lastname')
            let course = document.getElementById('course')
            let grade = document.getElementById('grade')

            firstname.value = element['firstname']
            lastname.value = element['lastname']
            course.value = element['course']
            grade.value = element['grade']

            row.parentNode.removeChild(row)
            data.splice(index, 1);
            localStorage.setItem('student-grades', JSON.stringify(data))
        })

        removeButton.type = 'button'
        removeButton.className = 'btn remove-btn'
        removeButton.value = 'X'
        removeButton.addEventListener('click', event => {
            row.parentNode.removeChild(row)
            data.splice(index, 1);
            localStorage.setItem('student-grades', JSON.stringify(data))
        })

        row.appendChild(cellName)
        row.appendChild(cellCourse)
        row.appendChild(cellGrade)
        row.appendChild(cellStatus)
        row.appendChild(editButton)
        row.appendChild(removeButton)
        tbody.appendChild(row)

        })
}

closeGradesBtn.addEventListener('click', event => {
    event.preventDefault()
    gradesDiv.style.display = 'none'
})

submitBtn?.addEventListener('click', event => {
    event.preventDefault()

    let firstname = document.getElementById('firstname').value
    let lastname = document.getElementById('lastname').value
    let course = document.getElementById('course').value
    let grade:(string|number) = document.getElementById('grade').value

    addStudentData(firstname, lastname, course, grade)
    modal.style.display = "none"
    viewAllGrades(data)
})

sortCoursesBtn.addEventListener('click', event => {
    event.preventDefault()
    console.log(data)

    data.sort(function(a, b) {
        var nameA = a.course.toUpperCase(); // ignore upper and lowercase
        var nameB = b.course.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });

      viewAllGrades(data)
})

sortGradesBtn.addEventListener('click', event => {
    event.preventDefault()

    data.sort(function(a, b) {
        var nameA = a.grade.toString().toUpperCase(); // ignore upper and lowercase
        var nameB = b.grade.toString().toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });

      viewAllGrades(data)
})


function addStudentData (firstname:string, lastname:string, course:string, grade:(string|number)) {
    
    let isPassing = true
    
    if (typeof grade === 'string') {
        if (grade === 'F') {
            isPassing = false
        }
    }

    if (grade <= 100) {
        if (grade >= 90) {
            console.log('grade >90')
            grade = 'A'
        } else if (grade >= 80) {
            grade = 'B'
        } else if (grade >= 75) {
            grade = 'C'
        } else if (grade >= 70) {
            grade = 'D'
        } else {
            grade = 'F'
            isPassing = false
        }
    }

    let student:Student = {
        firstname: firstname,
        lastname: lastname,
        course: course,
        grade: grade,
        isPassing: isPassing
    }

    data.push(student)
    localStorage.setItem('student-grades', JSON.stringify(data))
}

closeModal.addEventListener('click', event => {
    modal.style.display = "none"
}) 
