const {Router} = require('express');
const router = Router();
const { getFirestore } = require("firebase-admin/firestore");
const { applicationDefault } = require("firebase-admin/app");
const admin = require("firebase-admin");

//Damos permiso a admin
admin.initializeApp({
    credential: applicationDefault(),
})

const db = getFirestore();
    

//! AGREGAMOS UN PRODUCTO 
router.post('/api/products', async( req, res ) => {
    try {
        await db.collection('products')
        .doc(`/${req.body.id}/`)
        .create({name:req.body.name});

        return res.status(204).json();        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

})

//! TRAEMOS UN SOLO PRODUCTO POR SU ID
router.get('/api/products/:product_id', async( req, res ) => {
    try {
        const doc = db.collection('products').doc(req.params.product_id)
        const item = await doc.get();
        const response =item.data();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

//! TRAEMOS UN ARRAY CON TODOS LOS PRODUCTOS
router.get('/api/products', async( req, res ) => {
    try {     
        const query = db.collection("products");
        const querySnapshot = await query.get();

        const response = querySnapshot.docs.map( doc => ({
            id: doc.id,
            name: doc.data().name
        }))

        return res.status(200).json(response);
    
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

//! ELIMINAMOS UN PRODUCTO
router.delete('/api/products/:product_id', async( req, res ) => {
    try {
        const document = db.collection('products').doc(req.params.product_id);
        await document.delete();

        return res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

//! ACTUALIZAMOS UN PRODUCTO
router.put('/api/products/:product_id', async( req, res ) => {
    try {
        const document = db.collection('products').doc(req.params.product_id);
        await document.update({
            name: req.body.name
        })

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


module.exports = router
