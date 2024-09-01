import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#4A90E2',
    secondary: '#F5A623',
    background: '#F8F8F8',
    text: '#333333',
    accent: '#50E3C2',
    error: '#FF4D4F',
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.primary,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.text,
        marginBottom: 16,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});