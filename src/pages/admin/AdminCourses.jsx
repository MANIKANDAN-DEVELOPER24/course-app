import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography
} from "@mui/material";
import api from '../../api/axiosConfig';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "", price: "", instructor: "", duration: "", ratings: "", description: "", image: null
  });

  // Fetch all courses
  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("courses/");
      setCourses(res.data);
    } catch (err) { console.error(err); }
  };

  // Handle input changes
  const onChangeNew = (key) => (e) => {
    if (key === "image") setNewCourse({ ...newCourse, image: e.target.files[0] });
    else setNewCourse({ ...newCourse, [key]: e.target.value });
  };

  const onChangeEdit = (key) => (e) => {
    if (key === "image") setEditCourse({ ...editCourse, image: e.target.files[0] });
    else setEditCourse({ ...editCourse, [key]: e.target.value });
  };

  // Add course
  const handleAddCourse = async () => {
    try {
      const formData = new FormData();
      Object.entries(newCourse).forEach(([key, value]) => { if(value) formData.append(key, value); });

      const token = localStorage.getItem("access_token");
      await api.post("courses/", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setOpenAdd(false);
      setNewCourse({ name: "", price: "", instructor: "", duration: "", ratings: "", description: "", image: null });
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  // Edit course
  const handleEditCourse = async () => {
    try {
      const formData = new FormData();
      Object.entries(editCourse).forEach(([key, value]) => { if(value) formData.append(key, value); });

      const token = localStorage.getItem("access_token");
      await api.put(`courses/${editCourse.id}/update/`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setEditCourse(null);
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      const token = localStorage.getItem("access_token");
      await api.delete(`courses/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>Manage Courses</Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpenAdd(true)}>
        Add Course
      </Button>

      {/* Courses Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell><TableCell>Name</TableCell>
              <TableCell>Instructor</TableCell><TableCell>Price</TableCell>
              <TableCell>Duration</TableCell><TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <Button color="primary" size="small" sx={{ mr:1 }} onClick={() => setEditCourse(course)}>Edit</Button>
                  <Button color="error" size="small" onClick={() => handleDelete(course.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Course Modal */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" value={newCourse.name} onChange={onChangeNew("name")} />
          <TextField fullWidth margin="dense" label="Instructor" value={newCourse.instructor} onChange={onChangeNew("instructor")} />
          <TextField fullWidth margin="dense" label="Price" type="number" value={newCourse.price} onChange={onChangeNew("price")} />
          <TextField fullWidth margin="dense" label="Duration" value={newCourse.duration} onChange={onChangeNew("duration")} />
          <TextField fullWidth margin="dense" label="Ratings" value={newCourse.ratings} onChange={onChangeNew("ratings")} />
          <TextField fullWidth margin="dense" label="Description" multiline rows={3} value={newCourse.description} onChange={onChangeNew("description")} />
          <Button variant="contained" component="label" sx={{ mt:1 }}>
            Upload Image
            <input type="file" hidden onChange={onChangeNew("image")} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCourse}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Modal */}
      {editCourse && (
        <Dialog open={true} onClose={() => setEditCourse(null)}>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            <TextField fullWidth margin="dense" label="Name" value={editCourse.name} onChange={onChangeEdit("name")} />
            <TextField fullWidth margin="dense" label="Instructor" value={editCourse.instructor} onChange={onChangeEdit("instructor")} />
            <TextField fullWidth margin="dense" label="Price" type="number" value={editCourse.price} onChange={onChangeEdit("price")} />
            <TextField fullWidth margin="dense" label="Duration" value={editCourse.duration} onChange={onChangeEdit("duration")} />
            <TextField fullWidth margin="dense" label="Ratings" value={editCourse.ratings} onChange={onChangeEdit("ratings")} />
            <TextField fullWidth margin="dense" label="Description" multiline rows={3} value={editCourse.description} onChange={onChangeEdit("description")} />
            <Button variant="contained" component="label" sx={{ mt:1 }}>
              Upload Image
              <input type="file" hidden onChange={onChangeEdit("image")} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditCourse(null)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditCourse}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AdminCourses;
