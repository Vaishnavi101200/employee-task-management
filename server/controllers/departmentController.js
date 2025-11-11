import Department from '../models/Department.js';

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department Server Error" });
    }
}

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDep = new Department({
            dep_name,
            description
        });
        await newDep.save();
        return res.status(200).json({ success: true, department: newDep });
    }catch (error) {
        return res.status(500).json({ success: false, error: "add department Server Error" });
    }
}

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({_id: id});
        return res.status(200).json({ success: true, department });
    }catch (error) {
        return res.status(500).json({ success: false, error: "add department Server Error" });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const {dep_name, description} = req.body;
        const updatedDep = await Department.findByIdAndUpdate({_id: id}, {
            dep_name: dep_name, 
            description
        });
        return res.status(200).json({ success: true, updatedDep });
    }catch (error) {
        return res.status(500).json({ success: false, error: "edit department Server Error" });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Attempting to delete department:', id);
        
        if (!id) {
            return res.status(400).json({ success: false, error: "Department ID is required" });
        }

        const deletedep = await Department.findByIdAndDelete(id);
        if (!deletedep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        console.log('Department deleted successfully:', deletedep);
        return res.status(200).json({ success: true, deletedep });
    } catch (error) {
        console.error('Delete department error:', error);
        return res.status(500).json({ success: false, error: "delete department Server Error" });
    }
}

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };