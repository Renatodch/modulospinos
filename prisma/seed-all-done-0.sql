INSERT INTO user_course (date_start,date_update,state,progress,id_user) VALUES ('2023-11-14 23:59:59', '2023-11-14 23:59:59',0, 0, 6);

INSERT INTO activity (title, description, subject, type, date_max, id_user) VALUES ('Actividad Pregunta', 'Pregunta 1', 0, 0, '2023-11-19 12:00:00', 6);
INSERT INTO activity (title, description, subject, type, date_max, id_user) VALUES ('Actividad Pregunta', 'Pregunta 2', 0, 0, '2023-11-19 12:00:00', 6);

INSERT INTO activity (title, description, subject, type, date_max, id_user) VALUES ('Actividad Pregunta', 'Pregunta 3', 1, 0, '2023-11-20 12:00:00', 6);
INSERT INTO activity (title, description, subject, type, date_max, id_user) VALUES ('Actividad Proyecto', 'Proyecto 1', 1, 1, '2023-11-20 12:00:00', 6);
INSERT INTO activity (title, description, subject, type, date_max, id_user) VALUES ('Actividad Pregunta', 'Pregunta 4', 3, 0, '2023-11-21 12:00:00', 6);
INSERT INTO activity (title, description, subject, type, date_max, id_user) VALUES ('Actividad Proyecto', 'Proyecto 2', 4, 1, '2023-11-22 12:00:00', 6);
INSERT INTO activity (title, description, subject, type, date_max, id_user) VALUES ('Actividad Proyecto', 'Proyecto 3', 4, 1, '2023-11-22 12:00:00', 6);


INSERT INTO task (title, description, date_upload, type, id_activity, id_user) VALUES ('Tarea Pregunta', 'Tarea de Pregunta 1','2023-11-19 23:59:00', 0, 1, 6);
INSERT INTO task (title, description, date_upload, type, id_activity, id_user) VALUES ('Tarea Pregunta', 'Tarea de Pregunta 2','2023-11-19 23:59:00', 0, 2, 6);
