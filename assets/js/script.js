 const timeDisplayEl = $('#time-display');
 const projectDisplayEl = $('#project-display');
 const projectFormEl = $('#project-form');
 const projectNameInputEl = $('#taskName');
 const projectTypeInputEl = $('#taskDescription');
 const projectDateInputEl = $('#taskDueDate');

 function displayTime() {
   const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
   timeDisplayEl.text(rightNow);
 }

 function readProjectsFromStorage() {
   let projects = JSON.parse(localStorage.getItem('projects'));

   if (!projects) {
     projects = [];
   }

   return projects;
 }

 function saveProjectsToStorage(projects) {
   localStorage.setItem('projects', JSON.stringify(projects));
 }

 function createProjectCard(project) {
   const taskCard = $('<div>')
     .addClass('card project-card draggable my-3')
     .attr('data-project-id', project.id);
   const cardHeader = $('<div>').addClass('card-header h4').text(project.name);
   const cardBody = $('<div>').addClass('card-body');
   const cardDescription = $('<p>').addClass('card-text').text(project.type);
   const cardDueDate = $('<p>').addClass('card-text').text(project.dueDate);
   const cardDeleteBtn = $('<button>')
     .addClass('btn btn-danger delete')
     .text('Delete')
     .attr('data-project-id', project.id);
   cardDeleteBtn.on('click', handleDeleteProject);

   if (project.dueDate && project.status !== 'done') {
     const now = dayjs();
     const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');

     if (now.isSame(taskDueDate, 'day')) {
       taskCard.addClass('bg-warning text-white');
     } else if (now.isAfter(taskDueDate)) {
       taskCard.addClass('bg-danger text-white');
       cardDeleteBtn.addClass('border-light');
     }
   }

   cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
   taskCard.append(cardHeader, cardBody);

   return taskCard;
 }

 function printProjectData() {
   const projects = readProjectsFromStorage();

   const todoList = $('#todo-cards');
   todoList.empty();

   const inProgressList = $('#in-progress-cards');
   inProgressList.empty();

   const doneList = $('#done-cards');
   doneList.empty();

   for (let project of projects) {
     if (project.status === 'to-do') {
       todoList.append(createProjectCard(project));
     } else if (project.status === 'in-progress') {
       inProgressList.append(createProjectCard(project));
     } else if (project.status === 'done') {
       doneList.append(createProjectCard(project));
     }
   }

   $('.draggable').draggable({
     opacity: 0.7,
     zIndex: 100,
     helper: function (e) {
       const original = $(e.target).hasClass('ui-draggable')
         ? $(e.target)
         : $(e.target).closest('.ui-draggable');
       return original.clone().css({
         width: original.outerWidth(),
       });
     },
   });
 }

 function handleDeleteProject() {
   const projectId = $(this).attr('data-project-id');
   const projects = readProjectsFromStorage();

   projects.forEach((project) => {
     if (project.id === projectId) {
       projects.splice(projects.indexOf(project), 1);
     }
   });

   saveProjectsToStorage(projects);

   printProjectData();
 }

 function handleProjectFormSubmit(event) {
   event.preventDefault();

   const projectName = projectNameInputEl.val().trim();
   const projectType = projectTypeInputEl.val();
   const projectDate = projectDateInputEl.val();

   const newProject = {
     name: projectName,
     type: projectType,
     dueDate: projectDate,
     status: 'to-do',
   };

   const projects = readProjectsFromStorage();
   projects.push(newProject);

   saveProjectsToStorage(projects);

   printProjectData();

   projectNameInputEl.val('');
   projectTypeInputEl.val('');
   projectDateInputEl.val('');
 }

 function handleDrop(event, ui) {
   const projects = readProjectsFromStorage();

   const taskId = ui.draggable[0].dataset.projectId;

   const newStatus = event.target.id;

   for (let project of projects) {
     if (project.id === taskId) {
       project.status = newStatus;
     }
   }
   localStorage.setItem('projects', JSON.stringify(projects));
   printProjectData();
 }

 $('#taskForm').on('submit', handleProjectFormSubmit);

 projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

 displayTime();
 setInterval(displayTime, 1000);

 $(document).ready(function () {
   printProjectData();

   $('#taskDueDate').datepicker({
     changeMonth: true,
     changeYear: true,
   });

   $('.lane').droppable({
     accept: '.draggable',
     drop: handleDrop,
   });
 });