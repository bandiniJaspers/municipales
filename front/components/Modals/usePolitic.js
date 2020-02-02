import { useState } from 'react';
import fetch from 'isomorphic-unfetch'
const usePolitic = () => {
    const [ selectedPolitic, setSelectedPolitic] = useState(null)
    const [ isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [ isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [ reload, setReload] = useState(false);

    const onViewProfile = (p) => {
        setSelectedPolitic(p);
        setIsViewModalOpen(true);
    }

    const onSubmit = (data) => {
        fetch("lrem", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                ...data,
                codeCommune: data.commune.code,
                commune:data.commune.label
            })
        }).then(function (response) {
            if (response.status === 200) {
                setReload(true);
                alert("Ajout réussi");
                setIsCreateModalOpen(false);
            }
            else if (response.status === 401)
                alert("mauvais mot de passe")
            else
                alert("Echec de l'ajout")

        })

    }

    return {
        onViewProfile,
        isViewModalOpen,
        selectedPolitic,
        setIsViewModalOpen,
        isCreateModalOpen,
        setIsCreateModalOpen,
        reload,
        setReload,
        onSubmit
    }
}

export default usePolitic;
