'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateTeamMutation } from "@/services/mutations"
import { useToast } from "@/hooks/use-toast"

export function DialogDemo({ email, username}) {
  const { toast } = useToast()
  const [form, setForm] = useState({
    title: '',
    user_array: [username,""]
  })
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const mutation = useCreateTeamMutation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAssignToChange = (e) => {
    const value = e.target.value
    setForm(prev => ({ ...prev, user_array: value.split(",").map(email => email.trim()) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) return

    try {
      await mutation.mutateAsync(
        {
          title: form.title.trim(),
          names: form.user_array // Use form.user_array as names
        },
        {
          onSuccess: (data) => {
            router.push(`/mygroups/${form.title}/task/8`)
            setForm({ title: '', user_array: [] }) // Reset form state
            setOpen(false)
            toast({
              title: "Team created successfully",
              description: "Your team has been created.",
            })
          },
          onError: (error) => {
            console.error("Mutation error:", error)
            alert("Failed to create list: " + error.message)
            setOpen(false)
            toast({
              title: "Error",
              description: "Failed to create team",
              variant: "destructive",
            })
          },
        }
      )
    } catch (error) {
      console.error("Submit error:", error)
      alert("Error creating list: " + error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className='w-[20vw] h-[40px] bg-zinc-950 text-white hover:bg-zinc-900 hover:text-white'
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950">
        <DialogHeader>
          <DialogTitle className='text-white'>Create List</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Create a new list to organize your tasks.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-4">
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="title" className="text-right text-white">
                Name:
              </Label>
              <Input
                onChange={handleChange}
                id="title"
                name="title"
                value={form.title}
                maxLength={50}
                className="col-span-3 bg-zinc-900 border-zinc-800 text-white"
                placeholder="Enter list name"
                required
              />
            </div>
              {form.title.length >= 40 &&
          <p className={`text-xs mt-2 m-auto ${form.title.length >= 50 ? "text-red-500" : "text-gray-400"}`}>
            {form.title.length}/{50} characters
          </p>
          }
            <div className="flex flex-col items-start gap-2 mt-6 text-white">
              <Label htmlFor="user_array" className="text-right">
                Add People
              </Label>
              <Input
                onChange={handleAssignToChange}
                id="user_array"
                name="user_array"
                value={form.user_array.join(", ")} // Display as comma-separated
                className="col-span-3 bg-zinc-900 text-white"
                placeholder="Add Participants"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-zinc-800 text-white hover:bg-zinc-700"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Creating...' : 'Create List'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDemo
