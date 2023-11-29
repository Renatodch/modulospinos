"use client";
import { getActivities } from "@/controllers/activity.controller";
import { deleteSubjectById } from "@/controllers/subject.controller";
import { getUserCourses } from "@/controllers/user-course.controller";
import { isUserCourseInProgress } from "@/lib/utils";
import {
  Subject,
  TOAST_SUBJECT_DELETE_ERROR_ACTIVITIES,
  TOAST_SUBJECT_DELETE_ERROR_USER_COURSES,
  TOAST_SUBJECT_DELETE_SUCCESS,
} from "@/model/types";
import { Button, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";
import SubjectForm from "./subjectForm";

const SubjectList = ({ subjects }: { subjects: Subject[] }) => {
  const router = useRouter();
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
  const handleDelete = async (id_subject: number) => {
    setDeletedIndex(id_subject);
    setOnDelete(true);

    const activities = await getActivities(id_subject);
    if (activities.length > 0) {
      toast.error(TOAST_SUBJECT_DELETE_ERROR_ACTIVITIES);
      reset();
      return;
    }
    const user_courses = await getUserCourses();
    const _progress = subjects.findIndex((s) => s.id === id_subject);
    const some_uc = user_courses.find(
      (uc) => uc.progress >= _progress && isUserCourseInProgress(uc)
    );

    if (some_uc) {
      toast.error(TOAST_SUBJECT_DELETE_ERROR_USER_COURSES);
      reset();
      return;
    }

    await deleteSubjectById(id_subject);
    toast.success(TOAST_SUBJECT_DELETE_SUCCESS);
    reset();
  };

  const reset = () => {
    setOnDelete(false);
    setDeletedIndex(null);
    router.refresh();
  };

  return (
    <Table.Root className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Título</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Orden</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Modificar</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Borrar</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {subjects.map((subject, index) => {
          return (
            <Table.Row key={subject.id}>
              <Table.RowHeaderCell width={100}>
                {subject.id}
              </Table.RowHeaderCell>
              <Table.Cell width={300}>{subject.title}</Table.Cell>
              <Table.Cell width={250}>#{index + 1}</Table.Cell>
              <Table.Cell width={100}>
                <SubjectForm target={subject} />
              </Table.Cell>
              <Table.Cell width={100}>
                <Button
                  disabled={onDelete && subject.id === deletedIndex}
                  onClick={() => handleDelete(subject.id)}
                  color="red"
                  size="3"
                >
                  <AiFillDelete />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default SubjectList;
