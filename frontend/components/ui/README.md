# DeleteConfirmationModal Component

A reusable modal component for delete confirmations across the admin panel.

## Features

- **Consistent Design**: Matches the application's design system
- **Animated**: Smooth fade-in/out animations with Framer Motion
- **Loading State**: Shows loading spinner during deletion
- **Customizable**: Configurable title, message, and item name
- **Accessible**: Proper focus management and keyboard navigation
- **Backdrop Click**: Closes modal when clicking outside (disabled during deletion)

## Usage

```tsx
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal'

const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    itemId: null,
    itemName: ''
})
const [isDeleting, setIsDeleting] = useState(false)

const openDeleteModal = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, itemId: id, itemName: name })
}

const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, itemId: null, itemName: '' })
}

const handleDelete = async () => {
    setIsDeleting(true)
    try {
        await api.delete(`/items/${deleteModal.itemId}`)
        // Handle success
        closeDeleteModal()
    } catch (error) {
        // Handle error
    } finally {
        setIsDeleting(false)
    }
}

// In your JSX
<DeleteConfirmationModal
    isOpen={deleteModal.isOpen}
    onClose={closeDeleteModal}
    onConfirm={handleDelete}
    title="Delete Item"
    message="Are you sure you want to delete this item?"
    itemName={deleteModal.itemName}
    isDeleting={isDeleting}
/>
```

## Props

- `isOpen`: boolean - Controls modal visibility
- `onClose`: function - Called when modal should close
- `onConfirm`: function - Called when delete is confirmed
- `title`: string (optional) - Modal title
- `message`: string (optional) - Confirmation message
- `itemName`: string (optional) - Name of item being deleted
- `isDeleting`: boolean (optional) - Shows loading state

## Updated Components

The following admin components now use this modal:

- AdminMessagesViewer - Delete contact messages
- AdminProjectsManager - Delete portfolio projects
- AdminSkillsManager - Delete skill categories
- AdminStatsManager - Delete statistics
- AdminExperienceManager - Delete experience entries
- AdminServicesManager - Delete services
- AdminSettingsManager - Delete settings

All delete operations now show a professional confirmation dialog instead of browser alerts.