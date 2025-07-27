'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import SelectDemo from "./SelectDemo"
import DatePickerDemo from "./DatePicker"
import { useCreateMyTaskMutation } from "@/services/mutations"
import { useToast } from "@/hooks/use-toast"

export function Create({ userMail, listId }) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 1,
    end_d: null,
    taskStatus: 'ongoing',
    userMail: userMail,
    listName: listId
  })

  const [open, setOpen] = useState(false)
  const mutation = useCreateMyTaskMutation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePriorityChange = (value) => {
    setForm(prev => ({ ...prev, priority: value }))
  }

  const handleDateChange = (date) => {
    if (date instanceof Date) {
        setForm(prev => ({ ...prev, end_d: date.toISOString() }));
    } else {
        setForm(prev => ({ ...prev, end_d: new Date(date).toISOString() }));
    }
};
  
  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      priority: 1,
      end_d: '',
      taskStatus: 'ongoing',
      userMail: userMail,
      listName: listId
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const result = await mutation.mutateAsync(
        {
          ...form,
          userArray: form.assign_to,
        },
        {
          onSuccess: (data) => {
            toast({
              title: "Success",
              description: "Task created successfully",
              variant: "dark",
            });
            resetForm();
            setOpen(false);
          },
          onError: (error) => {
            console.error("Mutation error:", error);
            console.error("Error response:", error.response?.data);
            toast({
              title: "Error",
              description: "Failed to create task: " + (error.response?.data?.message || error.message),
              variant: "destructive",
            });
          },
        }
      );
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: "Error creating task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className='bg-zinc-950 text-zinc-100 rounded-[10px] hover:bg-zinc-900 border-[1px] hover:text-zinc-100 w-[11vw] p-0'
          >
            <Plus />
          </Button>
        </SheetTrigger>
        <SheetContent className='bg-black text-white'>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle className='text-white text-2xl font-bold'>Create a task</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-8 mt-5">
            <div className="flex flex-col items-start gap-2">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <div className="w-full">
          <Input
            onChange={handleChange}
            id="title"
            name="title"
            value={form.title}
            className="w-full bg-black text-white"
            required
            maxLength={50}
          />
          {form.title.length >= 40 &&
          <p className={`text-xs mt-1 ${form.title.length >= 50 ? "text-red-500" : "text-gray-400"}`}>
            {form.title.length}/{50} characters
          </p>
          }
        </div>
      </div>
      
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <div className="w-full">
          <Textarea
            onChange={handleChange}
            id="description"
            name="description"
            value={form.description}
            className="w-full bg-black text-white"
            maxLength={300}
          />
          {form.description.length >= 250 &&
          <p className={`text-xs mt-1 ${form.description.length >= 300 ? "text-red-500" : "text-gray-400"}`}>
            {form.description.length}/{300} characters
          </p>
          }
        </div>
      </div>
              <div>
                <SelectDemo
                  value={form.priority}
                  onValueChange={handlePriorityChange}
                />
              </div>
              <div>
              <DatePickerDemo
                  value={form.end_d ? new Date(form.end_d) : null} // Convert ISO string back to Date
                  onChange={handleDateChange}
              />

              </div>
              <SheetFooter>
                <Button
                  type="submit"
                  className='border border-zinc-800 bg-black w-full'
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? 'Creating...' : 'Create Task'}
                </Button>
              </SheetFooter>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Create