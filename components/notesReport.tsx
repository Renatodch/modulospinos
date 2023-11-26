"use client";
import { getActivities } from "@/controllers/activity.controller";
import { getSubjects } from "@/controllers/subject.controller";
import { getTasksByUserId } from "@/controllers/task.controller";
import { getFormatedNote, getTasksActivityDetail } from "@/lib/utils";
import {
  MIN_NOTE_APPROVED,
  NOT_INIT,
  PRIMARY_COLOR,
  Subject,
  TaskActivityDetail,
  User,
  User_Course,
} from "@/model/types";
import { Button, Dialog, Flex, Table } from "@radix-ui/themes";
import React, { useState } from "react";
import { CgNotes } from "react-icons/cg";
import { PuffLoader } from "react-spinners";

const NotesReport = ({
  user,
  user_course,
}: {
  user: User;
  user_course: User_Course | undefined | null;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasksDetail, setTasksDetail] = useState<TaskActivityDetail[]>([]);
  const cellStyle = "border-black border-2";
  let avgFinal = 0;
  let avgFinalComponents = "";
  const handleOpenChange = async (open: boolean) => {
    if (open) {
      const _subjects = await getSubjects();
      const activities = await getActivities();
      const userTasks = await getTasksByUserId(user.id);
      const _tasksDetail = getTasksActivityDetail(
        activities,
        userTasks,
        _subjects
      );
      setTasksDetail(_tasksDetail);
      setSubjects(_subjects);
      setLoaded(true);
    } else {
      avgFinal = 0;
      setLoaded(false);
    }
  };
  return (
    <Dialog.Root onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Flex justify={"start"}>
          <Button
            size="3"
            style={{
              backgroundColor: user_course ? PRIMARY_COLOR : "#f0f0f0",
            }}
            disabled={!user_course || user_course.state === NOT_INIT}
          >
            <CgNotes size="20" />
          </Button>
        </Flex>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 650 }}>
        <Dialog.Title align={"center"}>Reporte de notas</Dialog.Title>
        <Dialog.Description size="2" mb="4" className="flex flex-col ">
          <strong className="uppercase mb-2">Datos del estudiante</strong>
          <span>
            <strong className="text-black">Nombre: &nbsp;</strong>
            {user?.name}
          </span>
          <span>
            <strong className="text-black">iD: &nbsp;</strong>
            {user?.id}
          </span>
        </Dialog.Description>
        {loaded ? (
          <Table.Root variant="surface">
            <Table.Header style={{ backgroundColor: PRIMARY_COLOR }}>
              <Table.Row>
                <Table.ColumnHeaderCell
                  justify={"center"}
                  className={cellStyle}
                >
                  Tema
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  justify={"center"}
                  className={cellStyle}
                >
                  Actividades
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  justify={"center"}
                  className={cellStyle}
                >
                  Notas
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {subjects.map((s, index) => {
                const tasksDetailBySubject = tasksDetail.filter(
                  (t) => t.id_subject === s.id
                );
                const len = tasksDetailBySubject.length;
                const notes = tasksDetailBySubject.map((n) =>
                  n.score === null || n.score === undefined ? 0 : n.score
                );
                const pc: number =
                  len > 0
                    ? notes.reduce((acc, current) => acc + current, 0) / len
                    : user_course && user_course?.progress >= index
                    ? 20
                    : 0;

                avgFinalComponents += `PC${index} ${
                  index < subjects.length - 1 ? "+" : ""
                }`;
                avgFinal += pc / subjects.length;
                return (
                  <React.Fragment key={index}>
                    <Table.Row align={"center"}>
                      <Table.Cell
                        rowSpan={len + 2}
                        justify="center"
                        className={cellStyle}
                      >
                        {s.title}
                      </Table.Cell>
                    </Table.Row>
                    {tasksDetailBySubject.map((t, index) => (
                      <Table.Row key={index} align={"center"}>
                        <Table.Cell justify="center" className={cellStyle}>
                          {t.activity_title}
                        </Table.Cell>

                        <Table.Cell justify="center" className={cellStyle}>
                          {t.score?.toString().padStart(2, "0")}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                    <Table.Row>
                      <Table.Cell justify="center" className={cellStyle}>
                        PC {index + 1}
                      </Table.Cell>
                      <Table.Cell
                        justify="center"
                        className={`${
                          pc >= MIN_NOTE_APPROVED
                            ? "text-blue-600"
                            : "text-red-600"
                        } font-semibold text-center ${cellStyle}`}
                      >
                        {pc.toFixed(1).padStart(2, "0")}
                      </Table.Cell>
                    </Table.Row>
                  </React.Fragment>
                );
              })}
              <Table.Row>
                <Table.Cell justify="center" colSpan={2} className={cellStyle}>
                  <strong>
                    PROMEDIO FINAL &nbsp; ({avgFinalComponents})/#Temas
                  </strong>
                </Table.Cell>
                <Table.Cell
                  justify="center"
                  className={`${cellStyle} ${
                    avgFinal >= MIN_NOTE_APPROVED
                      ? "text-blue-600"
                      : "text-red-600"
                  } font-semibold text-lg text-center`}
                >
                  {user_course &&
                    user_course?.state! > NOT_INIT &&
                    getFormatedNote(avgFinal)}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        ) : (
          <p
            className="w-full flex justify-center items-center"
            style={{ height: "500px" }}
          >
            <PuffLoader
              color={PRIMARY_COLOR}
              loading={!loaded}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </p>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NotesReport;
