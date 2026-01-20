import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from '../actions/createPost';
const CreatePost = () => {
  return (
    <>
             <Card>
          <CardHeader>
            <CardTitle>Create New Posts</CardTitle> 
          <CardDescription>This will be create new post!</CardDescription>
          </CardHeader>
          <CardContent>
             <form action={createPost} className="space-y-4">
              <div>
                 <Label htmlFor="name">Name : </Label>
                 <Input type="text" id="name" name="name" />
              </div>
              <div>
                  <Label htmlFor="content">Content : </Label>
                  <Textarea  id="content" name="content" />
              </div>
              <div>
                  <Button type="submit" id="submitBtn" variant={"secondary"}>Create</Button>
              </div>
             </form>
          </CardContent>
        </Card>
    </>
  )
}

export default CreatePost