"use client";
import { useUserContext } from "@/app/context";
import { saveTask } from "@/controllers/task.controller";
import {
  ANSWER,
  PRIMARY_COLOR,
  TOAST_ANSWER_SAVE_SUCCESS,
  TOAST_BD_ERROR,
  Task,
  TaskActivityDetail,
} from "@/model/types";
import { Button, Dialog, Flex, TextArea } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { MdQuestionAnswer } from "react-icons/md";
import { toast } from "sonner";

const AnswerForm = ({
  taskActivityDetail,
}: {
  taskActivityDetail: TaskActivityDetail;
}) => {
  const { user } = useUserContext();
  const [task, setTask] = useState<Task | null | undefined>(undefined);
  const router = useRouter();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setSubmitted(true);
    let temp: Task | undefined = {
      id: 0,
      title: "",
      description: data.answer,
      image1: null,
      date_upload: new Date(),
      score: null,
      comment: null,
      type: ANSWER,
      id_activity: taskActivityDetail.id_activity,
      id_user: user?.id || 0,
    };

    try {
      temp = await saveTask(temp);
      !temp
        ? toast.error(TOAST_BD_ERROR)
        : toast.success(TOAST_ANSWER_SAVE_SUCCESS);
    } catch (e) {
      toast.error(TOAST_BD_ERROR);
    }

    setTask(temp);
    setSubmitted(false);
    reset();
    setOpenDialog(false);
    router.refresh();
  };

  const toggleDialog = (e: boolean) => {
    setOpenDialog(e);
    !e && reset();
  };

  return (
    <Dialog.Root open={openDialog} onOpenChange={toggleDialog}>
      <Dialog.Trigger>
        <Flex justify={"start"}>
          <Button
            size="3"
            disabled={taskActivityDetail.done || !!task}
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            <MdQuestionAnswer size="20" />
            Responder pregunta
          </Button>
        </Flex>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title align={"center"}>Respuesta</Dialog.Title>
        <Dialog.Description size="2" mb="4"></Dialog.Description>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            <TextArea
              id="answer"
              maxLength={255}
              size="3"
              color="gray"
              variant="surface"
              {...register("answer")}
              placeholder="Inserte su respuesta"
            />
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                size="3"
                variant="soft"
                color="gray"
                disabled={Boolean(submitted)}
              >
                Cancelar
              </Button>
            </Dialog.Close>
            <Button
              size="3"
              disabled={Boolean(submitted)}
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Guardar
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AnswerForm;