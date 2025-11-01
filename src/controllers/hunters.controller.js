import { supabase } from "../db/supabase.js";

export const obtenerTodosHunters = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("hunters")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerHunter = async (req, res) => {
  try {
    const { nombre } = req.params;

    const { data, error } = await supabase
      .from("hunters")
      .select("*")
      .ilike("nombre", nombre)
      .single();

    if (error) {
      if (error.code === '') {
        return res.status(404).json({ message: "Hunter no encontrado" });
      }
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearHunter = async (req, res) => {
  try {
    const { nombre, edad, altura, peso, imageurl, descripcion } = req.body;

    
   
    const { data, error } = await supabase
      .from("hunters")
      .insert([{ 
        nombre, 
        edad: edad || null, 
        altura: altura || null, 
        peso: peso || null, 
        imageurl: imageurl, 
        descripcion: descripcion || null 
      }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: "Ya existe un hunter con ese nombre" });
      }
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({
      message: "Hunter creado correctamente",
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const actualizarHunter = async (req, res) => {
  try {
    const { nombre } = req.params;
    const campos = req.body;

    // No permitir actualizar el nombre si se envía en el body
    if (campos.nombre) {
      return res.status(400).json({ error: "No se puede modificar el nombre" });
    }

    const { data, error } = await supabase
      .from("hunters")
      .update(campos)
      .ilike("nombre", nombre)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Hunter no encontrado" });
    }

    res.json({ 
      message: "Hunter actualizado correctamente", 
      data: data[0] 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarHunter = async (req, res) => {
  try {
    const { nombre } = req.params;

    const { data, error } = await supabase
      .from("hunters")
      .delete()
      .ilike("nombre", nombre)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Hunter no encontrado" });
    }

    res.json({ 
      message: "Hunter eliminado correctamente",
      data: data[0] 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};